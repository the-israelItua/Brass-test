import * as types from "../types";

const initialState = {
  banks: [],
  transferDetails: {},
  payments: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_BANK_NAMES:
      return {
        ...state,
        banks: payload,
      };
    case types.UPDATE_TRANSFER_DETAILS:
      const { key, value } = payload;
      return {
        ...state,
        transferDetails: {
          ...state.transferDetails,
          [key]: value,
        },
      };
    case types.UPDATE_PAYMENTS:
      const paymentItem = {
        ...state.transferDetails,
        ...payload,
      };

      return {
        ...state,
        transferDetails: {},
        payments: [...state.payments, paymentItem],
      };
    default:
      return state;
  }
};
