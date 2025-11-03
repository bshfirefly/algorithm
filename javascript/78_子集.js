var subsets = function (nums) {
    var ans = []
    var path = []
    var n = nums.length

    var dfs = (i) => {
        if (i === n) {
            ans.push([...path])
            return
        }

        dfs(i + 1)
        path.push(nums[i])
        dfs(i + 1)
        path.pop()
    }

    dfs(0)
    return ans
};

