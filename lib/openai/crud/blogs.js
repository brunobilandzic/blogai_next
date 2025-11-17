import { BlogPost } from "@/models/openai/blog";

export async function createBlog(attrs) {
    // attrs should include blogParameters and content 
    const doc = new BlogPost(attrs);
    return await doc.save();
}

export async function getBlogById(id) {
    return await BlogPost.findById(id).lean();
}

export async function getAllBlogs(filter = {}, { limit = 100, skip = 0, sort = { createdAt: -1 } } = {}) {
    return await BlogPost.find(filter).sort(sort).skip(skip).limit(limit).lean();
}

export async function updateBlog(id, patch) {
    return await BlogPost.findByIdAndUpdate(id, patch, { new: true }).lean();
}

export async function deleteBlog(id) {
    return await BlogPost.findByIdAndDelete(id).lean();
}

export default {
    createBlog,
    getBlogById,
    getAllBlogs,
    updateBlog,
    deleteBlog,
};