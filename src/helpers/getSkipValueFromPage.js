function getSkipValueFromPage(pageNum,itemsPerPage){
    if (!pageNum || pageNum < 1) {
        pageNum = 1;
      }
      const skip = (pageNum - 1) * itemsPerPage;
      return skip;
}

export default getSkipValueFromPage