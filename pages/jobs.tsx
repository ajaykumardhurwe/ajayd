// const Jobs = () => {
//     return <div className="text-center text-2xl py-20">Jobs Page</div>;
//   };
  
//   export default Jobs;
  













"use client"; // Required for App Router in Next.js 13+

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaWhatsapp, FaShare, FaCalendar } from "react-icons/fa";

export default function Jobs() {
  const [activeTab, setActiveTab] = useState("government");
  const [jobsData, setJobsData] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const router = useRouter(); // Use Next.js router

  const googleSheetUrls: { [key: string]: string } = {
    government:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwQv0QSfbhlGS2Pvo729YKsIG52TctoYV4_p-1wSVXePTU7R4EupdtbuGbkYeV_0KBRk5BD0bZ6Xkp/pub?gid=0&single=true&output=csv",
    private:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwQv0QSfbhlGS2Pvo729YKsIG52TctoYV4_p-1wSVXePTU7R4EupdtbuGbkYeV_0KBRk5BD0bZ6Xkp/pub?gid=717397891&single=true&output=csv",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(googleSheetUrls[activeTab]);
        const csvText = await response.text();
        const rows = csvText.split("\n");
        const headers = rows[0].split(",").map((header) => header.trim());
        const data = rows.slice(1).map((row) => {
          const values = row.split(",");
          const job: { [key: string]: string } = {};
          headers.forEach((header, index) => {
            job[header] = values[index]?.trim() || "";
          });
          return job;
        });

        const validJobs = data
          .filter((job) => job["Job Title"])
          .sort((a, b) => new Date(b["Start Date"]).getTime() - new Date(a["Start Date"]).getTime());

        setJobsData(validJobs);
        setFilteredJobs(validJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleFilter = () => {
    const filtered = jobsData.filter((job) => {
      const jobStartDate = new Date(job["Start Date"]).getTime();
      const jobEndDate = new Date(job["End Date"]).getTime();
      const filterStart = startDate ? new Date(startDate).getTime() : null;
      const filterEnd = endDate ? new Date(endDate).getTime() : null;

      const matchesDate = (!filterStart || jobStartDate >= filterStart) && (!filterEnd || jobEndDate <= filterEnd);
      const matchesLocation = !locationFilter || job["Location"]?.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesDate && matchesLocation;
    });

    setFilteredJobs(filtered);
  };

  const shareOnWhatsApp = (job: any) => {
    const message = `📢 *Job Alert!* 📢
    
🔹 *Job Title:* ${job["Job Title"]}
🏢 *Company:* ${job["Organization/Company Name"]}
📍 *Location:* ${job["Location"] || "Not specified"}
📅 *Start Date:* ${job["Start Date"]}
⏳ *End Date:* ${job["End Date"]}

🔗 More Details: https://ajaydhurwe.tech/
📲 Download App: https://play.google.com/store/apps/details?id=com.ajaykumardhurwe.ajaydhurwe`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Jobs 📌</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "government" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("government")}
        >
          🏛 Government Jobs
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "private" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("private")}
        >
          🏢 Private Jobs
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center space-x-4 mb-4">
        <label className="flex flex-col">
          📅 Start Date:
          <input type="date" className="border rounded px-2 py-1" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label className="flex flex-col">
          📅 End Date:
          <input type="date" className="border rounded px-2 py-1" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <label className="flex flex-col">
          <span className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span>Location:</span>
          </span>
          <select className="border rounded px-2 py-1" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            {["Bilaspur", "Bhilai", "Durg", "Kawardha", "Raipur", "Rajnandgaon"].map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleFilter}>
          🔍 Apply Filter
        </button>
      </div>

      {/* Jobs List */}
      <div className="border p-4 rounded shadow">
        {filteredJobs.length > 0 ? (
          <ul className="space-y-2">
            {filteredJobs.map((job, index) => (
              <li key={index} className="flex justify-between items-center p-3 bg-green-100 rounded shadow hover:bg-green-200 transition">
                <button className="w-full text-left" onClick={() => router.push(`/jobs/${index}`)}>
                  <div className="flex items-center space-x-4">
                    <img src={job["Image Link"]} alt={job["Job Title"]} className="w-12 h-12 rounded-full border-2 border-white" />
                    <div>
                      <div className="text-lg font-medium">{job["Job Title"]}</div>
                      <div className="text-sm text-gray-600">{job["Organization/Company Name"]}</div>
                    </div>
                  </div>
                </button>
                <button onClick={() => shareOnWhatsApp(job)} className="text-green-600 text-2xl ml-2">
                  <FaShare />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No jobs found</p>
        )}
      </div>
    </div>
  );
}
