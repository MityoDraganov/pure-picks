import useFormData from '../../lib/hooks/useForm';
import { IUser } from '../../Interfaces/User.interface';

import { InputGroup } from '../../Components/InputGroup';

export const Register = () => {
  const [authData, handleInputChange] = useFormData<IUser>({
    username: '',
    email: '',
    password: '',
    rePassword: '',
    type: '',
  });

  return (
    <div>
      <form className='w-2/5 m-auto absolute top-1/4 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col gap-4 '>
        <InputGroup
          label='Username'
          placeHolder=''
          value={authData.username}
          onChange={handleInputChange}
          id='username'
        />

        <InputGroup
          label='Email'
          placeHolder=''
          value={authData.email}
          onChange={handleInputChange}
          id='email'
        />

        <InputGroup
          label='Password'
          placeHolder=''
          value={authData.password}
          onChange={handleInputChange}
          id='password'
        />

        <InputGroup
          label='Confirm password'
          placeHolder=''
          value={authData.rePassword}
          onChange={handleInputChange}
          id='rePassword'
        />
      </form>
    </div>
  );
};
