export const selectProduct = (state) => state.products.items;

export const selectIsLoading = (state) => {
  return state.products.isLoading;
};
