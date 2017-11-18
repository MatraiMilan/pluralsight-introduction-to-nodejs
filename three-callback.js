let initialTime = process.hrtime();

const resolveCallback = (timeout, resolve) => {
    setTimeout(() => {
        resolve(process.hrtime(initialTime));
    }, timeout);
}

const rejectCallback = (errorMessage, timeout, reject) => {
    setTimeout(() => {
        reject(errorMessage);
    }, timeout);
};

const createTimerPromise = (promiseTimeout, isResolve, name) => {
    let wrappedPromiseObj = {};
    const createdPromise = new Promise((resolve, reject) => {
        if (isResolve) {
            resolveCallback(promiseTimeout, resolve);
        } else {
            const errorMessage = `Rejected as wanted: createTimerPromise's second parameter was falsey`;
            rejectCallback(errorMessage, promiseTimeout, reject);
        }
    });
    wrappedPromiseObj.promise = createdPromise;
    wrappedPromiseObj.name = name;
    return wrappedPromiseObj;
}

const calculateMsFromNs = (timerArray) => {
    if(timerArray && timerArray instanceof Array) {
        const NS_PER_SEC = 1e9;
        const DIFF = 1000000;
    
        const calculated = Math.round((timerArray[0] * NS_PER_SEC + timerArray[1]) / DIFF);
        return calculated;
    }
    return NaN;
}

const firstWrappedPromise = createTimerPromise(0, true, "firstPromise");
const timerWrappedPromise = createTimerPromise(1500, true, "timerPromise");
const rejectWrappedPromise = createTimerPromise(1000, false, "rejectPromise");

const promiseNames = [firstWrappedPromise.name, timerWrappedPromise.name, rejectWrappedPromise.name];

const promises = [
    firstWrappedPromise.promise.catch(errorMessage => {
        console.error(`firstPromise rejected: ${errorMessage}`);
    }), 
    timerWrappedPromise.promise.catch(errorMessage => {
        console.error(`timerPromise rejected: ${errorMessage}`);
    }), 
    rejectWrappedPromise.promise.catch(errorMessage => {
        console.error(`rejectPromise rejected: ${errorMessage}`);
    })
];

Promise.all(promises)
    .then(promiseValuesArray => {
        let i = 0;
        promiseValuesArray.forEach(promiseValue => {
            if(promiseValue) {
                console.log(`${promiseNames[i]} process took: ${calculateMsFromNs(promiseValue)} ms`);
            }
            i++;
        })
    });
