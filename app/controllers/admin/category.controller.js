const sequelize = require("../../models/index.model");
const response = require("../../helpers/response");
const bcrypt = require("../../helpers/bcrypt");

const index = async (req, res, next) => {
  try {
    const [categories] = await sequelize.query("SELECT * FROM Categories");
    return response.success(res, "Successfully", categories);
  } catch (error) {
    next(new Error("Failed to fetch categories"));
  }
};

const create = async (req, res, next) => {
  const { name } = req.body;

  try {
    const [existingCategory] = await sequelize.query(
      `
      SELECT * FROM Categories WHERE name = :name
    `,
      {
        replacements: {
          name,
        },
      }
    );

    if (existingCategory && existingCategory.length > 0) {
      next(new Error("Category already exit"));
      return;
    }

    await sequelize.query(
      `INSERT INTO Categories (name, updated_at, created_by)
      VALUES ( :name, NOW(), :created_by )`,
      {
        replacements: {
          name,
          created_by: req.admin.login_id,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    return response.success(res, "Category created successfully");
  } catch (error) {
    next(new Error("Failed to create category"));
  }
};

const show = async (req, res, next) => {
  const { category_id } = req.params;

  try {
    const [category] = await sequelize.query(
      "SELECT * FROM Categories WHERE category_id = :category_id",
      {
        replacements: {
          category_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!category) {
      next(new Error("Category not found"));
      return;
    }

    return response.success(res, "Successfully", category);
  } catch (error) {
    next(new Error("Fail to fetch category"));
  }
};

const update = async (req, res, next) => {
  const { category_id } = req.params;
  const { name } = req.body;

  try {
    let [category] = await sequelize.query(
      "SELECT * FROM Categories WHERE category_id = :category_id",
      {
        replacements: {
          category_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!category) {
      next(new Error("Category not found"));
      return;
    }

    await sequelize.query(
      `UPDATE Categories SET name = :name WHERE category_id = :category_id`,
      {
        replacements: {
          name,
          category_id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    [category] = await sequelize.query(
      "SELECT * FROM Categories WHERE category_id = :category_id",
      {
        replacements: {
          category_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return response.success(res,'Successfully', category);

  } catch (error) {
    next(new Error("Failed to update category"));
  }
};

const destroy = async (req, res, next) => {
  const { category_id } = req.params;

  try {
    const [category] = await sequelize.query(
      "SELECT * FROM Categories WHERE category_id = :category_id",
      {
        replacements: {
            category_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!category) {
      next(new Error("Category not found"));
    }

    await sequelize.query(`DELETE FROM Categories WHERE category_id = :category_id`, {
      replacements: {
        category_id,
      },
      type: sequelize.QueryTypes.DELETE,
    });

    return res.json({
      status: true,
      message: "Successfully",
    });
  } catch (error) {
    next(new Error("Failed to delete category"));
  }
};

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
};
