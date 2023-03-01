// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_EXPENSES':
    return {
      expenses: [
        ...state.expenses,
        {
          // Reference: Brunão
          id: state.expenses.length,
          ...action.expenses,
        },
      ],
    };
  default:
    return state;
  }
};

export default wallet;
