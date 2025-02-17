import { useState } from "react";

interface FormData {
  username: string;
  password: string;
};

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    return;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.username || !formData.password) {
      console.log("ValidationError")
      return;
    }
  };

  return (
    <div>
      <div>Login</div>
      <div>ID: 
        <input type="text" value={formData.username} onChange={handleChange} />
      </div>
      <div>PW: 
        <input type="password" name="" id="" value={formData.password} onChange={handleChange} />
      </div>
      <div>
        <button type="submit">Login</button>
        <button type="reset">Reset</button>
      </div>
    </div>
  )
}
