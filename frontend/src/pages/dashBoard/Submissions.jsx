import { useState, useEffect } from "react";
import { Table, Tag, Space, Button, message, Modal } from "antd";
import api from "../../api/api";
import { CheckCircle, XCircle, Download, FileText } from "lucide-react";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const { data } = await api.get("/api/courses/all-submissions");
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      message.error("Failed to fetch submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/api/courses/submissions/${id}?status=${status}`);
      message.success(`Submission ${status.toLowerCase()} successfully`);
      fetchSubmissions();
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: ["user", "username"],
      key: "username",
    },
    {
      title: "Course",
      dataIndex: ["course", "course_name"],
      key: "course_name",
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
      render: (text, record) => (
        <Space>
          <FileText size={16} />
          {text}
        </Space>
      ),
    },
    {
      title: "Submitted At",
      dataIndex: "submittedAt",
      key: "submittedAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "COMPLETED" ? "green" : status === "REJECTED" ? "red" : "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            success
            icon={<CheckCircle size={16} />} 
            onClick={() => handleStatusUpdate(record.id, "COMPLETED")}
            disabled={record.status === "COMPLETED"}
          >
            Approve
          </Button>
          <Button 
            danger 
            icon={<XCircle size={16} />} 
            onClick={() => handleStatusUpdate(record.id, "REJECTED")}
            disabled={record.status === "REJECTED"}
          >
            Reject
          </Button>
          <Button 
            icon={<Download size={16} />} 
            onClick={() => window.open(`http://localhost:8080/api/courses/submissions/${record.id}/download`)}
          >
            Download
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Project Submissions</h2>
      <Table 
        columns={columns} 
        dataSource={submissions} 
        loading={loading} 
        rowKey="id"
      />
    </div>
  );
}

export default Submissions;
