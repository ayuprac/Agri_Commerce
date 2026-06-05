import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/forms/RegisterForm/RegisterForm';
import { Sprout } from 'lucide-react';

export const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-earth-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Sprout className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-display font-bold text-earth-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-earth-600">
            Join AgriEcommerce for best agricultural products
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl">
          <RegisterForm />
        </div>

        <p className="text-center text-sm text-earth-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};