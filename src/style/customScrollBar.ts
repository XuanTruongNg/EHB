export const customScrollbar = (
  wScroll: string | number,
  showHorizonal = false
) => {
  return {
    '&::-webkit-scrollbar': {
      width: wScroll,
      height: showHorizonal ? wScroll : '100%',
    },
    '&::-webkit-scrollbar-track': {
      width: wScroll,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#9D9D9D',
      borderRadius: '24px',
    },
  };
};
