import requestApi from '../services/api';

export const ACTION_USER = 'ACTION_USER';
export const ACTION_EXPENSES = 'ACTION_EXPENSES';

export const actionUser = (email) => ({
  type: ACTION_USER,
  email,
});

export const thunk = (expenses) => (dispatch, getState) => {
  console.log(getState());
  console.log(expenses);
  requestApi().then((data) => {
    console.log(data);
    dispatch({
      type: ACTION_EXPENSES,
      expenses: { ...expenses, exchangeRates: data },
    });
  });
};
