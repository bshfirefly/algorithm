var removeElement = function (nums, val) {
    var left = 0
    var right = nums.length - 1

    if (nums.length === 1 && nums[0] === val) {
        return 0
    }

    while (left <= right) {
        if (nums[right] === val) {
            right--
            continue
        }

        if (nums[left] === val) {
            nums[left] = nums[right]
            left++
            right--
        } else {
            left++
        }
    }

    return left
};


removeElement([3, 2, 2, 3], 3)

