module.exports = (sequelize, DataTypes) => {
  // 모델 이름이 자동으로 소문자, 복수형으로 적용이 된다. users
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  Comment.associate = (db) => {
    // belongsTo는 가상의 id column을 만들어준다.
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
