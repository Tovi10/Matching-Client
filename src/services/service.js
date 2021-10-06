export const numberWithCommas = (goal) => {
    return goal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}