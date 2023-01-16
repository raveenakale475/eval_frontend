export const initialState = {
  name: "",
  email: "",
  password: "",
  gender: "",
};

export const SignupReducer = (state, { type, payload }) => {
  switch (type) {
    case "name": {
      return {
        ...state,
        name: payload,
      };
    }
    case "email": {
      return {
        ...state,
        email: payload,
      };
    }
    case "password": {
      return {
        ...state,
        password: payload,
      };
    }
    case "gender": {
      return {
        ...state,
        gender: payload,
      };
    }
    default: {
      return state;
    }
  }
};


