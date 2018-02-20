export const firebaseToArray = data => {
	let arrayData = [];

	for (let id in data) {
		let dataObject = {
			...data[id],
			id
		}

		arrayData.push(dataObject);
	}

	return arrayData;
};

export const codeIdent = str => str.replace(/(\s\t)/gmi, '<br />$1').replace(/\t/gmi, '&nbsp;&nbsp;&nbsp;&nbsp;');