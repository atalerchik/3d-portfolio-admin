import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AddWorkForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImage] = useState("");
  const [object, setObject] = useState("");
  const [fileContent, setFileContent] = useState("");
  const navigate = useNavigate();

  function handleFileSelect(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setFileContent(event?.target?.result as string);
    };

    reader.readAsText(file);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedWork = { name, description, image: imageUrl, object: fileContent };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedWork),
    });
    setName("");
    setDescription("");
    setImage("");
    setObject("");
    navigate("/login");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Work</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={100}
          className="border w-full text-white-900 rounded-full py-2 px-4 mr-2 bg-neutral-700 border-neutral-600 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={1000}
          className="border w-full text-white-900 rounded py-2 px-4 mr-2 bg-neutral-700 border-neutral-600 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block font-medium mb-1">
          Image
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={imageUrl}
          onChange={(event) => setImage(event.target.value)}
          className="border w-full text-white-900 rounded-full py-2 px-4 mr-2 bg-neutral-700 border-neutral-600 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="object" className="block font-medium mb-1">
          Model
        </label>
        <input
          type="file"
          id="object"
          name="object"
          value={object}
          onChange={handleFileSelect}
          className="border w-full text-white-900 rounded-full py-2 px-4 mr-2 bg-neutral-700 border-neutral-600 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600"
        />
      </div>
      <div className="flex justify-end">
        <Link to="/" className="flex items-center text-sm">
          <button type="button" className="text-gray-500 font-medium mr-4">
            Cancel
          </button>
        </Link>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
}