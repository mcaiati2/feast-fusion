import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../store';

const initialFormData = {
  first_name: '',
  last_name: '',
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

  const handleSubmit = async (event: React.
    FormEvent<HTMLFormElement>) => {
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

  const handleInputChange = (event: React.
    ChangeEvent<HTMLInputElement>) => {
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

          {formData.error_message && <p className="text-danger text-center">{formData.error_message}</p>}

          {!propsObj.isLogin && (
            <>
            <div className="mb-3">
              <label htmlFor="first-name-input" className="form-label">First Name</label>
              <input onChange={handleInputChange} value=
              {formData.first_name} name="first_name" 
              type="text" className="form-control" 
              id="first-name-input" required />
            </div>

            <div className="mb-3">
              <label htmlFor="last-name-input" 
              className="form-label">Last Name</label>
              <input onChange={handleInputChange} value=
              {formData.last_name} name="last_name" type="text" className="form-control" id="last-name-input" 
              required />
            </div>
          </>
          )}
              <div className="mb-3">
                <label htmlFor="InputEmail" 
                className="form-label">Email address</label>
                <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" name="email" onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="InputPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="InputPassword" name="password" onChange={handleInputChange} required />
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