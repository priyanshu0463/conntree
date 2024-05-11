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
    const data = `
    Name: ${formData.firstname} ${formData.lastname}
    Email: ${formData.email}
    Twitter: ${formData.twitter}
    GitHub: ${formData.github}
    LinkedIn: ${formData.linkdin}
    `;
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
      anchor.download = `${formData.firstname} ${formData.lastname}`+'.png';
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
          <title>${formData.firstname} ${formData.lastname}</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            img {
              max-width: 100%;
              max-height: 100%;
            }
          </style>
        </head>
        <body>
          <<p>${formData.firstname} ${formData.lastname}</p>
          <p>${formData.email}</p>
          <p>${formData.twitter} ${formData.linkdin !== '' ? `| ${formData.linkdin}` : ''} ${formData.github !== '' ? `| ${formData.github}` : ''}</p>
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
    <main className="bg-[#fdfdfa] w-screen h-screen relative flex items-center justify-center p-16 flex-col min-w-[300px] md:flex-row">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-6xl items-center p-5 sm:flex-row flex-col md:flex-row min-w-[300px]">
        <div className="pl-25 px-16 min-w-[300px] flex justify-self items-self-center">
          <div className=''>

          <h1 className='sm:align-middle text-[30px] font-bold  text-[#c3a791]'>Add details</h1>
          <p className="text-[15px] text-[#c3a791] mt-1">Click on Create button to generate the QR Code!</p>
          <form action="" onSubmit={generateQRCode} className='flex flex-col gap-1   '>
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
        <div className="justify-center items-center ">
        {qrCodeUrl ? (
          <div className="sm:mt-0 mt-5 flex flex-col items-center ">
            <p className='font-semibold text-xl' >{formData.firstname} {formData.lastname}</p>
            <p>{formData.email}</p>
            <p>{formData.twitter} {formData.linkdin !== '' ? `| ${formData.linkdin} ` : ''} {formData.github !== '' ? `| ${formData.github} ` : ''} </p>
            <Image className="rounded-2xl py-5" width={350} height={350} src={qrCodeUrl} alt="QR Code" />
            <div className='flex flex-row gap-10 justify-center py-5'>
            <button className="bg-[#aa8c76] rounded-xl text-white px-4 hover:scale-105 duration-300 flex flex-row gap-2 font-bold items-center" style={{ width: '120px' }} onClick={handlePrint}>
            <img src="print.png" width={30} alt="Print" /> Print
            </button>
            <button className="bg-[#aa8c76] rounded-xl text-white px-3  pr-6 py-1 hover:scale-105 duration-300 flex flex-row gap-2 font-bold items-center " style={{ minWidth: '120px' }}onClick={handleDownload}><img src="download.png" width={30} alt="Print" />Download</button>

            </div>
          </div>
        ) : (
          <div className=' sm:block hidden min-w-[450px] '>

            <Image
              className="rounded-2xl"
              style={{ width: '550px', height: '550px' }}
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
