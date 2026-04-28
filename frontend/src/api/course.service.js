import api from "./api";

async function getAllCourses() {
  try {
    const { data } = await api.get("/api/courses");
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { success: false, error: "Could not fetch courses" };
  }
}

async function getCourseById(courseId) {
  try {
    const { data } = await api.get(`/api/courses/${courseId}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching course:", error);
    return { success: false, error: "Could not fetch course details" };
  }
}

async function getFeedbacks(courseId) {
  try {
    const { data } = await api.get(`/api/feedbacks/${courseId}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return { success: false, error: "Unable to fetch feedbacks" };
  }
}

async function postFeedback(courseId, comment) {
  try {
    await api.post("/api/feedbacks", { comment, course_id: courseId });
    return { success: true };
  } catch (error) {
    console.error("Error posting feedback:", error);
    return { success: false, error: "Unable to post feedback" };
  }
}

async function getMessages(courseId) {
  try {
    const { data } = await api.get(`/api/discussions/${courseId}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { success: false, error: "Unable to fetch messages" };
  }
}

async function addMessage(formData) {
  try {
    const { data } = await api.post("/api/discussions/addMessage", formData);
    return { success: true, data };
  } catch (error) {
    console.error("Error adding message:", error);
    return { success: false, error: "Unable to add message" };
  }
}

async function getMaterials(courseId) {
  try {
    const { data } = await api.get(`/api/courses/${courseId}/materials`);
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching materials:", error);
    return { success: false, error: "Unable to fetch materials" };
  }
}

async function uploadSubmission(courseId, userId, file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    const { data } = await api.post(`/api/courses/${courseId}/submit`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data };
  } catch (error) {
    console.error("Error uploading submission:", error);
    return { success: false, error: "Unable to upload submission" };
  }
}

async function uploadMaterial(courseId, file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post(`/api/courses/${courseId}/materials`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data };
  } catch (error) {
    console.error("Error uploading material:", error);
    return { success: false, error: "Unable to upload material" };
  }
}

export const courseService = {
  getAllCourses,
  getCourseById,
  getFeedbacks,
  postFeedback,
  getMessages,
  addMessage,
  getMaterials,
  uploadSubmission,
  uploadMaterial,
};
