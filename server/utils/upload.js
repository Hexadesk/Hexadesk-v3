import aws from '../Controllers/aws';

// eslint-disable-next-line
const uploadMutipleFiles = async files => {
	const filePromises = [];
	files.map(async file => {
		const url = await aws.UploadToAws(file);
		console.log(url);
		filePromises.push({ url });
	});
	console.log('filePRomisessssssss', filePromises);
	return filePromises;
};

export default uploadMutipleFiles;