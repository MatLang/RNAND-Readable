store = {
  posts: {
    [postId]: {
      id,
      timestampe,
      title,
      body,author,category,
      voteScore,
      deleted
    }
  },
  comments: {
    [commentId]: {
      id,
      parentId,
      timestamp,
      body,
      author,educ
      deleted,
      parentDeleted
    }
  },
  categories: {
    categories: {
      name,
      path
    }
  }
}


// git guideline

/* feat: a new feature
fix: a bug fix
docs: changes to documentation
style: formatting, missing semi colons, etc; no code change
refactor: refactoring production code
test: adding tests, refactoring test; no production code change
chore: updating build tasks, package manager configs, etc; no production code change */
