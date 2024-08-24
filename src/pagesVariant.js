export const loginVariant = {
  initial: {
    opacity: 0,
    left: "-100%",
  },
  animate: {
    opacity: 1,
    left: "0",
  },
  exit: {
    opacity: 0,
    right: "-100%",
  },
};

export const dashboardVarinats = {
    initial: {
        opacity: 0,
        bottom: -500,
      },
      animate: {
        opacity: 1,
        bottom: 0,
      },
      exit: {
        opacity: 0,
        top: -500,
      },
}
