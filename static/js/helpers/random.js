
let idAlreadyUse = [];
export const getRandomId = () => {
	let id = Math.floor(1000000 + Math.random() * 8999999);
	while (id in idAlreadyUse){
		id = Math.floor(1000000 + Math.random() * 8999999);
	}
	idAlreadyUse.push(id)
	return id;
}

export const dropUsedId = (id) => {
	idAlreadyUse = idAlreadyUse.filter((usedId)=>(id!==usedId));
}
