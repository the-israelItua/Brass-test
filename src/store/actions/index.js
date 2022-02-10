import axios from "axios";
import * as types from "../types";
import { toast } from "react-toastify";

export const fetchBanks = () => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/bank`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TEST_SECRET_KEY}`,
      },
    });
    dispatch({
      type: types.FETCH_BANK_NAMES,
      payload: response.data.data,
    });
  } catch (err) {
    toast(err.message || "An error occurred.");
  }
};

export const updateTransferDetails = (value) => (dispatch) => {
  dispatch({
    type: types.UPDATE_TRANSFER_DETAILS,
    payload: value,
  });
};

export const verifyBankAccount = async ({ bankCode, accountNumber }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TEST_SECRET_KEY}`,
        },
      }
    );
    toast.success("Account number is valid. Continue");
    return response.data.status;
  } catch (err) {
    toast("Couldn't verify bank account try again");
    return false;
  }
};

export const createTransferRecipient =
  (recipientDetails) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/transferrecipient`,
        recipientDetails,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TEST_SECRET_KEY}`,
          },
        }
      );

      dispatch(
        updateTransferDetails({
          key: "recipient",
          value: response.data.data,
        })
      );
    } catch (err) {
      toast(err.message || "An error occurred.");
    }
  };

export const initiateTransfer =
  (transferDetails, onSuccess, onFail) => (dispatch) => {
    try {
      const response = axios.post(
        `${process.env.REACT_APP_BASE_URL}/transfer`,
        transferDetails,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: types.UPDATE_PAYMENTS,
        payload: response.data,
      });

      onSuccess();
    } catch (err) {
      onFail();
      toast(err.message || "An error occurred.");
    }
  };
