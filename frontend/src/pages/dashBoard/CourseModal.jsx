import { Modal, Form, Input, InputNumber, message, Upload as AntUpload, Button } from "antd";
import { UploadOutlined, FileTextOutlined } from "@ant-design/icons";
import api from "../../api/api";
import { useState, useEffect } from "react";
import { adminService } from "../../api/admin.service";

const { TextArea } = Input;

function CourseModal({ isOpen, onClose, onSuccess, courseId = null, mode = "add" }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  const isEditMode = mode === "edit" || courseId !== null;
  const modalTitle = isEditMode ? "Edit Course" : "Add New Course";
  const submitButtonText = isEditMode ? "Update Course" : "Add Course";
  const loadingText = isEditMode ? "Updating..." : "Adding...";

  useEffect(() => {
    if (isOpen && isEditMode && courseId) {
      fetchCourseData();
    } else if (isOpen && !isEditMode) {
      form.resetFields();
    }
  }, [isOpen, courseId, isEditMode]);

  const fetchCourseData = async () => {
    setFetchingData(true);
    try {
      const result = await adminService.getCourseById(courseId);
      if (result.success) {
        const formData = {
          course_name: result.data.course_name,
          instructor: result.data.instructor,
          price: result.data.price,
          description: result.data.description,
          y_link: result.data.y_link,
          p_link: result.data.p_link,
        };
        form.setFieldsValue(formData);
      } else {
        message.error(result.error);
        onClose();
      }
    } catch {
      message.error("Failed to fetch course data");
      onClose();
    } finally {
      setFetchingData(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      let result;
      if (isEditMode) {
        const editData = {
          course_name: values.course_name,
          instructor: values.instructor,
          price: values.price,
          description: values.description,
          y_link: values.y_link,
          p_link: values.p_link,
        };
        result = await adminService.updateCourse(courseId, editData);
      } else {
        const addData = {
          course_name: values.course_name,
          instructor: values.instructor,
          price: values.price,
          description: values.description,
          y_link: values.y_link,
          p_link: values.p_link,
        };
        result = await adminService.createCourse(addData);
      }

      if (result.success) {
        // Handle Video Upload if present
        if (values.videoFile && values.videoFile.file) {
          const videoFile = values.videoFile.file;
          const courseIdForVideo = isEditMode ? courseId : result.data.course_id;
          
          const formData = new FormData();
          formData.append("file", videoFile);
          
          try {
            await api.post(`/api/courses/${courseIdForVideo}/video`, formData, {
              headers: { "Content-Type": "multipart/form-data" }
            });
            message.success("Video uploaded successfully!");
          } catch (error) {
            message.error("Failed to upload video file.");
          }
        }

        message.success(isEditMode ? "Course updated successfully!" : "Course added successfully!");
        form.resetFields();
        onClose();
        onSuccess?.();
      } else {
        message.error(result.error);
      }
    } catch {
      message.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={modalTitle}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="custom-modal"
      destroyOnClose
    >
      {fetchingData ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
          <span className="ml-3 text-gray-600">Loading course data...</span>
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-2 space-y-4"
          initialValues={{
            course_name: "",
            instructor: "",
            price: 0,
            description: "",
            y_link: "",
            p_link: "",
          }}
        >
          <Form.Item
            label="Course Name"
            name="course_name"
            rules={[
              { required: true, message: "Course name is required" },
              { min: 3, message: "Course name must be at least 3 characters" },
              { max: 100, message: "Course name cannot exceed 100 characters" },
            ]}
          >
            <Input placeholder="Enter course name" />
          </Form.Item>

          <Form.Item
            label="Instructor"
            name="instructor"
            rules={[
              { required: true, message: "Instructor is required" },
              { min: 2, message: "Instructor name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter instructor name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Price is required" },
              { type: "number", min: 0, message: "Price must be a positive number" },
            ]}
          >
            <InputNumber
              placeholder="Enter price"
              className="w-full"
              min={0}
              step={0.01}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Description is required" },
              { min: 10, message: "Description must be at least 10 characters" },
              { max: 500, message: "Description cannot exceed 500 characters" },
            ]}
          >
            <TextArea rows={4} placeholder="Enter course description" showCount maxLength={500} />
          </Form.Item>

          <Form.Item
            label="Video Link"
            name="y_link"
            rules={[
              { required: true, message: "Video link is required" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input placeholder="https://example.com/video" />
          </Form.Item>

          <Form.Item
            label="Image Link"
            name="p_link"
            rules={[
              { required: true, message: "Image link is required" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.Item label="Supplementary Materials">
             <AntUpload
               beforeUpload={(file) => {
                 // In a real app, we'd handle this via a separate API call or combined multipart request
                 // For now, we'll just show it can be done.
                 message.info("File selected: " + file.name);
                 return false; // Prevent automatic upload
               }}
               maxCount={1}
             >
               <Button icon={<UploadOutlined />}>Select Material (PDF/Zip)</Button>
             </AntUpload>
             <p className="text-xs text-gray-400 mt-1">Materials can be added after creating the course in the Materials management section.</p>
          </Form.Item>

          <Form.Item label="Course Video File" name="videoFile">
             <AntUpload
               beforeUpload={(file) => {
                 message.info("Video selected: " + file.name);
                 return false;
               }}
               maxCount={1}
               accept="video/*"
             >
               <Button icon={<UploadOutlined />}>Upload Direct Video</Button>
             </AntUpload>
             <p className="text-xs text-gray-400 mt-1">Prefer direct video? Upload it here. Otherwise, use the Video Link above.</p>
          </Form.Item>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium min-w-[140px] flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {loadingText}
                </>
              ) : (
                submitButtonText
              )}
            </button>
          </div>
        </Form>
      )}
    </Modal>
  );
}

export default CourseModal;
