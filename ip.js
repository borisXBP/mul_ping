/** @format */
const fs = require('fs');

const ipRange = [1, 255]; // ip网段范围
const excludeArr = [1, 2, 3, 52, 53, 63, 72, 78, 117, 245, 249]; // 确定需要排除掉的其他 ip 地址

let res = [];
for (let i = ipRange[0]; i < ipRange[1]; i++) {
	res.push(i);
}
res = res.filter(i => !excludeArr.includes(i));
res = res.sort((a, b) => a - b).map(i => `192.168.35.${i}`);
(async () => {
	save(res.join('\r'));
})();

function save(data) {
	return (() => {
		fs.writeFile('./file.txt', data, 'utf8', err => {
			if (err) {
				console.log('写文件出错了，错误是：' + err);
			} else {
				console.log('ok');
			}
		});
	})();
}
