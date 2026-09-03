# Valuable lessons learned in the project


## 1. How Axios Attaches an Interceptor to the Promise

The interceptor is attached **before the Promise is given to the application's code**. When an Axios request is created, Axios first creates the Promise representing the network operation. It then attaches the registered interceptors to that Promise using `.then()` and returns the resulting Promise to the caller.

A simplified representation of Axios's internal mechanism is:

```javascript
// simplified axios internals

let promise = dispatchRequest(config);
// promise represents the raw network operation

// Attach the registered response interceptors
for (const interceptor of responseInterceptors) {
    promise = promise.then(
        interceptor.fulfilled,
        interceptor.rejected
    );
}

return promise; // This is the Promise given to our application code
```

For example, suppose our application calls:

```javascript
const promise = authApi.me();
```

The important point is that `authApi.me()` does **not receive the raw network Promise directly**. Axios has already attached the response interceptor before returning the Promise.

Conceptually:

```text
Network request
      ↓
Raw network Promise
      ↓
Axios attaches interceptor
      ↓
New Promise produced by .then()
      ↓
Promise returned to authApi.me()
      ↓
Promise returned to our application
```

Therefore, it is useful to think of the interceptor as **middleware around the Promise chain**. The original network operation still exists underneath, but Axios creates a new Promise through `.then()` and gives that new Promise to the caller.

The connection is established by this line:

```javascript
promise = promise.then(
    interceptor.fulfilled,
    interceptor.rejected
);
```

The `.then()` call creates a **new Promise** whose result depends on what the interceptor callback does.

For example:

```javascript
(error) => {
    console.log("401 detected");
    return Promise.reject(error);
}
```

If the interceptor returns `Promise.reject(error)`, the Promise created by `.then()` becomes rejected with that error.

Likewise, in a refresh-token scenario:

```javascript
(error) => {
    return axiosClient(config);
}
```

the Promise created by `.then()` becomes connected to the Promise returned by the retry request. If the retry succeeds, the chained Promise succeeds. If the retry fails, the chained Promise fails.

Therefore, the key idea is:

> **Axios does not wait until the end and then somehow pipe the response into the interceptor. The interceptor was already attached to the Promise chain when the Axios request was created. The Promise returned to our application is already wired to the interceptor's return value.**

This is why the interceptor can transparently change what the caller receives without the caller needing to know that an interceptor exists.

### One Interceptor Function, Multiple Executions

There is **one registered interceptor function**, but it can be **executed independently for every response**.

For example, if three requests are made:

```text
Request A ──→ Promise Chain A ──→ Interceptor Execution A
Request B ──→ Promise Chain B ──→ Interceptor Execution B
Request C ──→ Promise Chain C ──→ Interceptor Execution C
```

The interceptor function itself is shared:

```javascript
(error) => {
    // same function
}
```

but each request has its **own Promise chain** and therefore its own execution of that function.

If Request A receives a `401`, the interceptor execution associated with Request A runs. If Request B later receives a `200`, the same interceptor function runs in the successful path for Request B.

Thus:

> **One interceptor function is registered on the Axios instance, but each request has its own Promise chain and its own execution of that interceptor function.**
