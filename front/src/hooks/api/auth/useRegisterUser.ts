import {useMutation} from "@tanstack/react-query";


interface IRegistrationFormData {
  email: string,
  username: string,
  password: string,
  passwordConfirmation: string,
}

interface IRegistrationFormErrors {
  email?: Array<string>,
  username?: Array<string>,
  password?: Array<string>,
  passwordConfirmation?: Array<string>,
}

async function registerUser(formData: IRegistrationFormData): Promise<void> {
  const response = await fetch("http://localhost:8000/api/user/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const errorData: IRegistrationFormErrors = await response.json();
    console.log(errorData);
    throw {
      response: {
        data: errorData
      }
    }
  }

  return await response.json();
}

export default function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}