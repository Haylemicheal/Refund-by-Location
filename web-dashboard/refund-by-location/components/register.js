import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Layout } from './account/Layout';
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

export default Register;

function newfunc() {
    const API_KEY = process.env.API_KEY;
    const API_URL = process.env.API_URL;
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
    const web3 = createAlchemyWeb3(API_URL); 
    const contract = require("../../../artifacts/contracts/refundByLocation.sol/refundByLocation.json")
    const RefundContract = new web3.eth.Contract(
    contract,
    CONTRACT_ADDRESS
    );
}

function Register() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Name is Required'),
        address: Yup.string()
            .required('Address is required'),
        latitude: Yup.string()
            .required('Latitude is required'),
        longtiude: Yup.string()
            .required('Longtiude is required'),
        radius: Yup.string()
            .required('radius is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        console.log(user)
        newfunc()
    }

    return (
       <Layout>
            <div className="card">
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input name="fullname" type="text" {...register('fullname')} className={`form-control ${errors.fullname ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.fullname?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input name="address" type="text" {...register('address')} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.address?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Latitude</label>
                            <input name="latitude" type="text" {...register('latitude')} className={`form-control ${errors.latitude ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.latitude?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Longtiude</label>
                            <input name="longtiude" type="text" {...register('longtiude')} className={`form-control ${errors.longtiude ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.longtiude?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Radius</label>
                            <input name="radius" type="text" {...register('radius')} className={`form-control ${errors.radius ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.radius?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                    </form>
                </div>
            </div>
            </Layout>
    );
}
