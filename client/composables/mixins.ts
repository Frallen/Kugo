export const overFlow = (state: boolean): void => {
  if (state) {
    document.body.style.overflow = "hidden";
  } else document.body.style.overflowY = "visible";
};
