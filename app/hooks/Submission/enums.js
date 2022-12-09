export const State = {
    Running: 1,
    Success: 2,
    Failed: 4,
    Warning: 8,
}

export const ExecutionResult = {
    // User canceled the op
    Canceled: 'canceled',
    // Op failed on chain
    Failed: 'failed',
    // Op confirmed on chain
    Success: 'success',

    // Op submitted on chain
    // Only when called with early return mode enabled
    Submitted: 'submitted',
}

export const WatchResult =  {
    Failed: 0,
    Success: 1,
}