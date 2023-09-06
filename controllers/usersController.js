const {User} = require("../config/db.config");

exports.register = async (req, res) => {
    
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Kullanıcı kaydı hatası:", error);
    res
      .status(500)
      .json({ error: "Kullanıcı kaydı sırasında bir hata oluştu." });
  }
};

exports.login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({
            where: {
                emailId,
                password,
            },
        });
        if (user) {
            res.status(200).json({ message: "Kullanıcı girişi başarılı." });
        } else {
            res.status(404).json({ error: "Kullanıcı bulunamadı." });
        }
    }
    catch (error) {
        console.error("Kullanıcı girişi hatası:", error);
        res.status(500).json({ error: "Kullanıcı girişi sırasında bir hata oluştu." });
    }
};
