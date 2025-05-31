import {useMutation} from "@tanstack/react-query";


interface IRegistrationFormData {
  email: string,
  username: string,
  password: string,
  passwordConfirmation: string,
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
    throw new Error("Registration failed.");
  }

  return response.json();
}

export default function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}