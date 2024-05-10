"use client";
import Image from 'next/image'
import two from "../../public/two.jpeg";
import qrcode from 'qrcode-generator';
import { useState } from 'react';


export default function Home() {
  const [qrCodeUrl, setQRCodeUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    firstname:'',
    lastname:'',
    email: '',
    twitter: '',
    github: '',
    linkdin: '',
  });

  const generateQRCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const qr = qrcode(0, 'M');
    const data = `Name: ${formData.firstname} ${formData.lastname}\nEmail: ${formData.email}\nTwitter: ${formData.twitter}\nGitHub: ${formData.github}\nLinkdIn: ${formData.linkdin}`;
    qr.addData(data);
    qr.make();
    const qrUrl = qr.createDataURL();
    setQRCodeUrl(qrUrl);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'twitter' && value.trim() !== '' && !value.startsWith('@')) {
        const twitterValue = '@' + value.trim();
        setFormData((prevData) => ({
            ...prevData,
            [name]: twitterValue,
        }));
    } else {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
  };

  const handleReset = () => {
    setQRCodeUrl('');
    setFormData({
      firstname:'',
      lastname:'',
      email: '',
      twitter: '',
      github: '',
      linkdin: '',
    });

  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const anchor = document.createElement('a');
      anchor.href = qrCodeUrl;
      anchor.download = formData.firstname+'.png';
      anchor.click();
    } else {
      alert('No QR code to download.');
    }
  };


  const handlePrint = () => {
    if (qrCodeUrl) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>QR Code</title>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
                img { max-width: 100%; max-height: 100%; }
              </style>
            </head>
            <body>
              <img src="${qrCodeUrl}" alt="QR Code">
            </body>
          </html>
        `);
        printWindow.print();
      } else {
        alert('Failed to open print window.');
      }
    } else {
      alert('No QR code to print.');
    }
  };


  return (
    <main className="bg-[#fdfdfa] w-screen h-screen relative flex items-center justify-center mt-8 p-8 md:p-16 flex-col min-w-[300px] md:flex-row">
        {/* form container */}
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-6xl items-center p-5 sm:flex-row flex-col md:flex-row min-w-[300px]">
        {/*content container  */}
        <div className="p-4 sm:p-8 min-w-[300px] flex flex-col justify-center items-center">
          <div className='sm:p-16'>

          <h1 className='text-2xl sm:text-3xl font-bold text-[#c3a791] text-center mt-4 sm:mt-0'>Add details</h1>
          <p className="text-[15px] text-[#c3a791] mt-1 text-center">Click on Create button to generate the QR Code!</p>
          <form action="" onSubmit={generateQRCode} className='flex flex-col gap-2 w-full max-w-sm mt-4'>
            <input
              className="p-2 mt-8 rounded-xl border outline-[#c3a791] flex min-w-[10px]"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              placeholder='First Name'
              required
              />
            <input
              className="p-2 mt-8 rounded-xl border outline-[#c3a791] flex min-w-[10px]"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              placeholder='Last Name'
              required
            />
          <input
              className="p-2 mt-8 rounded-xl border  outline-[#c3a791] flex min-w-[200px]"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Email Address'
              required
              />
            <input
              className="p-2 mt-8 rounded-xl border outline-[#c3a791] flex min-w-[10px]"
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              placeholder='Twitter'
              />
            <input
              className="p-2 mt-8 rounded-xl border outline-[#c3a791] flex min-w-[10px]"
              type="text"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
              placeholder='GitHub'
              />
            <input
              className="p-2 mt-8 rounded-xl border outline-[#c3a791] flex min-w-[10px]"
              type="text"
              name="linkdin"
              value={formData.linkdin}
              onChange={handleInputChange}
              placeholder='LinkdIn'
            />
            <div className='flex flex-row gap-10 justify-center py-5'>
            <button className="bg-[#aa8c76] rounded-xl text-white py-2 hover:scale-105 duration-300" style={{ width: '120px' }} type="submit">Create</button>
            <button className="bg-[#aa8c76] rounded-xl text-white py-2 hover:scale-105 duration-300" style={{ width: '120px' }}onClick={handleReset}>Cancel</button>

            </div>
          </form>
              </div>
        </div>
        {/* img container */}
        <div className="justify-center items-center ">
        {qrCodeUrl ? (
          <div className="sm:mt-0 mt-5 flex flex-col items-center ">

            <Image className="rounded-2xl py-5" width={350} height={350} src={qrCodeUrl} alt="QR Code" />
            <div className='flex flex-row gap-10 justify-center py-5'>
            <button className="bg-[#aa8c76] rounded-xl text-white p-2 hover:scale-105 duration-300 " style={{ width: '120px' }}onClick={handlePrint}>Print</button>
            <button className="bg-[#aa8c76] rounded-xl text-white p-2 hover:scale-105 duration-300 " style={{ width: '120px' }}onClick={handleDownload}>Download</button>

            </div>
          </div>
        ) : (
          <div className=' sm:block hidden min-w-[450px] '>

            <Image
              className="rounded-2xl"
              style={{ width: '600px', height: '500px' }}
              src={two}
              alt="alt"
            />
          </div>
        )}
        </div>
      </div>
    </main>
  );
}
