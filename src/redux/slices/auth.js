import { createSlice } from "@reduxjs/toolkit";
import { showSnackbar } from "./app";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
  user_id: null,
  email: "",
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.user_id = null;
    },
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

// Reducer
export default slice.reducer;

export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "https://chirpsky-server.onrender.com/auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              token: response.data.token,
            })
          );
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "https://chirpsky-server.onrender.com/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);

        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    // Make API call here

    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "https://chirpsky-server.onrender.com/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
            user_id: response.data.user_id,
          })
        );
        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem("user_id");
    dispatch(slice.actions.signOut());
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "https://chirpsky-server.onrender.com/auth/register",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );

        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ error: false, isLoading: true })
        );
      })
      .finally(() => {
        if (!getState().auth.error) {
          window.location.href = "https://chirpsky-server.onrender.com/auth/verify";
        }
      });
  };
}






export function VerifyEmail(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "https://chirpsky-server.onrender.com/auth/verify",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(slice.actions.updateRegisterEmail({ email: "" }));
        window.localStorage.setItem("user_id", response.data.user_id);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );


        dispatch(
          showSnackbar({ severity: "success", message: response.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ error: true, isLoading: false })
        );
      });
  };
}