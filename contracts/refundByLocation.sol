//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract refundByLocation {
    address public employer;
    address[] public employees;

    constructor() {
        employer = msg.sender;
    }

    struct contractSpec {
        int256 center_lat;
        int256 center_lon;
        int256 radius;
        uint8 budget;
        bool status;
    }

    mapping(address => contractSpec) public contractInfo;

    function checkExistence(address employee) private view returns(bool) {
        for (uint256 i = 0; i < employees.length; i++) {
            if (employee == employees[0]) {
                return true;
            }
        }
        return false;
    }
    
    function addEmployee(address employee, int256 lat, int256 lon, int256 rad, uint8 budget) public  {
        if (!checkExistence(employee)) {
            contractInfo[employee].center_lat = lat;
            contractInfo[employee].center_lon = lon;
            contractInfo[employee].radius = rad;
            contractInfo[employee].budget = budget;
            contractInfo[employee].status = false;
            employees.push(employee);
        }
    }

    function getEmployee() public view returns(address[] memory){
        return employees;
    }

    function sqrt(int256 x) public pure returns (int256 y) {
        int256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function calculateRadius(int256 lat, int256 lon, address adr) private view returns(int256) {
        int256 radius = 0;
        int256 x = lat - contractInfo[adr].center_lat;
        int256 y = lon - contractInfo[adr].center_lon;
        radius = sqrt(x**2 + y**2);
        return radius;
    }

    function checkLocation(int256 lat, int256 lon) public{
        int256 rad = calculateRadius(lat, lon, msg.sender);
        if (rad < contractInfo[msg.sender].radius) {
            contractInfo[msg.sender].status = true;
        } else {
            contractInfo[msg.sender].status = false;
        }
    }
    function pay(address payable _to) public {
        if (checkExistence(_to) && contractInfo[msg.sender].status == true) {
            bool sent = _to.send(contractInfo[_to].budget);
            require(sent, "Payment Failed");
            contractInfo[_to].status=false;
        }
    }
}