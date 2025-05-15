import { app } from "./index";
import { PORT } from "./config/config";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
