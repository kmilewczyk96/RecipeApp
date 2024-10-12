import {json} from "react-router-dom";


export default function UserProfilePage() {
  return (
    <>
    </>
  );
};
export async function userProfileLoader({request, params}){
  const userID = params["userID"] + "/";
  const response = await fetch("http://localhost:8000/api/user/users/" + userID);

  if (!response.ok) {
    throw json({message: "Something went wrong."}, {
      status: 404,
      statusText: "User does not exist."
    });
  }

  return response.json();
}
