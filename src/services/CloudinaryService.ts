export const uploadImg = async (
	pic: FormDataEntryValue,
	formData: FormData
) => {
	pic && formData.append("file", pic);
	formData.append("upload_preset", "chat-app");
	formData.append("cloud_name", "dnmozbagq");
	const postImg = await fetch(
		"https://api.cloudinary.com/v1_1/dnmozbagq/image/upload",
		{
			method: "POST",
			body: formData,
		}
	);
	const res = await postImg.json();

	return res;
};
