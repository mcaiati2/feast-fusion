import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../store';

const initialFormData = {
  email: '',
  password: '',
  error_message: ''
};

function AuthForm(propsObj: { isLogin: boolean }) {
  const [formData, setFormData] = useState(initialFormData); 
  const navigate = useNavigate();
  const store = useStore();

  if (!store) {
    throw new Error("Store is not available");
  }

  const { setState } = store;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = propsObj.isLogin ? '/auth/login' : '/auth/register';

    try {
      const res = await axios.post(url, formData);

      if (res.status === 200) {
        setState(oldState => ({
          ...oldState,
          user: res.data.user
        }));
        
        navigate('/');
      } 
    } catch (error: any) {
      setFormData(oldFormData => ({
        ...oldFormData,
        error_message: error.response.data.message
      }));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(oldFormData => ({
      ...oldFormData,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <main id="authForm">
      <section className="row formStyle">
        <form className="col-4 mx-auto" onSubmit={handleSubmit}>
          <h2 className="text-center">{propsObj.isLogin ? 'Sign In' : 'Sign Up'}</h2>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleInputChange} />
            <div className="form-text">Feast Fusion would never share your password with anyone.</div>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Stay logged in?</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section>
    </main>
  );
}

export default AuthForm;