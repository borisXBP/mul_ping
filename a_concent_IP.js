/** @format */
const xs_mac = ['96:DC:B2:ED:00:30', '96:DC:B2:ED:00:31'];
const my_mac = ['96:DC:B2:ED:00:2E', '96:DC:B2:ED:00:2F'];
const excludeArr = [1, 2, 3, 52, 53, 63, 72, 78, 117, 245, 249];
const Axios = require('./node_modules/axios');
// http request拦截器 添加一个请求拦截器
function setToken(token) {
	Axios.interceptors.request.use(
		i => {
			i.headers.Authorization = `Bearer ${token}`;
			return i;
		},
		function (error) {
			return Promise.reject(error);
		},
	);
}
Axios.defaults.timeout = 4 * 1000;
const Rx = require('rxjs');
const { from, map, mergeMap, concatAll, filter, tap, observable, Subject } = Rx;
//const { fromPromise } = observable;

let ipList = new Array(255)
	.fill(1)
	.map((i, idx) => idx)
	.filter(i => !excludeArr.includes(i));

const targetMac = ['96:DC:B2:ED:00:2E', '96:DC:B2:ED:00:2F'];
const macNum = 1; // 网口号： 0 或 1

console.log('-----');
logRTUip(ipList, 0);
setTimeout(() => {
	console.log('-----');
	logRTUip(ipList, 1);
}, 5000);

function logRTUip(ipList, macNum) {
	from(ipList)
		.pipe(
			map(i => (async () => await getToken(i))()),
			concatAll(),
			filter(i => i),
			map(i => (async () => await getMAC(macNum, ...i))()),
			concatAll(),
			filter(i => Array.isArray(i)),
			map(i => (async () => await getBuildTime(...i))()),
			concatAll(),
			tap(i => console.log(i)),
			filter(
				i =>
					i[1].includes(targetMac[0].toLowerCase()) ||
					i[1].includes(targetMac[1].toLowerCase()),
			),
		)
		.subscribe(i => {
			console.log(`目标 IP 是   192.168.35.${i[0]}`);
		});
}

function getToken(ip) {
	return new Promise((resolve, reject) => {
		Axios.post(`http://192.168.35.${ip}/v1/login?pw=aisenz.com`)
			.then(i => {
				resolve([ip, i.data.result.token]);
			})
			.catch(i => resolve(false));
	});
}

function getMAC(type, ip, token) {
	setToken(token);
	return new Promise((resolve, reject) => {
		Axios.post(
			`http://192.168.35.${ip}/v1/system/gen/exec`,
			`ip link show dev eth${type}`,
		)
			.then(i => {
				resolve([
					ip,
					i.data.result.data
						? i.data.result.data.split('link/ether ')[1].slice(0, 17)
						: '  :  :  :  :  :  ',
				]);
			})
			.catch(i => resolve(false));
	});
}

function getBuildTime(ip, mac) {
	return new Promise((resolve, reject) => {
		Axios.get(`http://192.168.35.${ip}/addBuildTime.js`)
			.then(i => {
				//console.log(eval(`${i.data};time= log`));
				resolve([ip, mac, String(i.data).slice(50, 69)]);
			})
			.catch(i => resolve([ip, mac, '']));
	});
}
