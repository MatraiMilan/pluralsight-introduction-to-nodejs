let os = require('os');

function toMb(f) {
    return (Math.round((f / 1024 / 1024) * 100) / 100);
}

console.log('Host: ' + os.hostname());
console.log('15 min. load average: ' + os.loadavg()[2]);
console.log(toMb(os.freemem()) + " Mb of " + toMb(os.totalmem()) + " Mb is free");