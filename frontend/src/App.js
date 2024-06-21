import React, { useState } from "react";
import axios from "axios";
import "./styles/tailwind.css";
import { FaUpload } from "react-icons/fa";

const filterResponse = (response) => {
  const lines = response.split("\n");
  const filteredLines = [];

  for (let i = 0; i < lines.length; i++) {
    if (
      lines[i].endsWith("is not a valid oed field") ||
      lines[i].startsWith("missing required column") ||
      lines[i].includes("invalid OccupancyCode")
    ) {
      filteredLines.push(lines[i]);

      // Capture subsequent lines related to the error
      let j = i + 1;
      while (j < lines.length && lines[j].trim() !== "") {
        filteredLines.push(lines[j]);
        j++;
      }
    }
  }

  return filteredLines.join("\n");
};

function App() {
  const [file, setFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);
  const [command, setCommand] = useState("location");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isSecondFileSelected, setIsSecondFileSelected] = useState(false);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsFileSelected(!!e.target.files.length);
  };

  const onSecondFileChange = (e) => {
    setSecondFile(e.target.files[0]);
    setIsSecondFileSelected(!!e.target.files.length);
  };

  const downloadIssues = () => {
    const blob = new Blob([response], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    let downloadFileName = file.name.replace(/\.[^/.]+$/, "") + "_issues.txt";
    link.setAttribute("download", downloadFileName);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("csv", file);
    if (secondFile) {
      formData.append("locationCsv", secondFile);
    }
    formData.append("command", command);

    try {
      const result = await axios.post("http://localhost/backend/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data) {
        let filteredOutput;
        if (result.data.stderr) {
          filteredOutput = filterResponse(result.data.stderr);
        } else if (result.data.stdout) {
          filteredOutput = filterResponse(result.data.stdout);
        } else {
          filteredOutput = "File is valid.";
        }

        setResponse(filteredOutput);

        setHistory((prevHistory) => [
          ...prevHistory,
          { fileName: file.name, response: filteredOutput },
        ]);
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      setResponse("Error uploading the file.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="flex bg-white max-w-1xl mx-auto p-8 shadow-xl rounded-lg text-center mt-10">
        <div className="w-1/2 bg-white p-4 overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer mb-2 p-2 hover:bg-gray-200"
              onClick={() => setResponse(item.response)}
            >
              {item.fileName}
            </div>
          ))}
        </div>
        <div className="p-4">
          <h1 className="text-2xl mb-6 font-semibold text-gray-700">
            Exposure Validation
          </h1>
          <div className="space-y-6 position-relative">
            <select
              onChange={(e) => setCommand(e.target.value)}
              className="p-3 border rounded selectoptions w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="location">Location</option>
              <option value="account">Account and Location</option>
            </select>
            {command === 'location' ? (
              <>
                <button
                  className={`btn inputfile ${
                    isFileSelected ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  onClick={() => document.getElementById('location-file-input').click()}
                >
                  <FaUpload className="mr-2" /> Choose a location file
                </button>
                <input
                  type="file"
                  id="location-file-input"
                  onChange={onFileChange}
                  className="hidden"
                />
              </>
            ) : (
              <>
                <button
                  className={`btn inputfile ${
                    isFileSelected ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  onClick={() => document.getElementById('account-file-input').click()}
                >
                  <FaUpload className="mr-2" /> Choose an account file
                </button>
                <input
                  type="file"
                  id="account-file-input"
                  onChange={onFileChange}
                  className="hidden"
                />
                <button
                  className={`btn inputfile mt-4 ${
                    isSecondFileSelected ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  onClick={() => document.getElementById('location-file-input-2').click()}
                >
                  <FaUpload className="mr-2" /> Choose a location file
                </button>
                <input
                  type="file"
                  id="location-file-input-2"
                  onChange={onSecondFileChange}
                  className="hidden"
                />
              </>
            )}
            <div className="space-x-4">
              <button
                onClick={onUpload}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded transform transition-transform duration-150 hover:scale-105"
              >
                Upload
              </button>
              {response && !response.includes('File is valid.') && (
                <button
                  onClick={downloadIssues}
                  className="w-1/2 bg-red-500 downloadred hover:bg-red-600 text-white py-3 px-4 rounded transform transition-transform duration-150 hover:scale-105"
                >
                  Download Issues
                </button>
              )}
            </div>
            {response && (
              <div className="mt-6 p-6 border rounded bg-gray-100">
                <h2 className="mb-2 text-lg font-medium text-gray-600">
                  Response:
                </h2>
                <pre className="break-all text-sm text-gray-700">
                  {response}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
