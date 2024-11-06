export const timeAgo = (createdAt) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(createdAt)) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;

  return new Date(createdAt).toLocaleDateString();
};
