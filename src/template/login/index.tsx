"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import Button from "@/components/button";
import styles from "./login.module.scss";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ROUTES_DASHBOARD } from "@/enums/routes";
import { LOCALSTORAGE_KEYS } from "@/enums/localstorage-keys";

const phoneSchema = z.object({
  phone: z
    .string()
    .startsWith("09", "Phone number must start with 09")
    .length(11, "Phone number must be exactly 11 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

type PhoneForm = z.infer<typeof phoneSchema>;

const Login = () => {
  const router = useRouter();
  const [_, setToken] = useLocalStorage<string>(LOCALSTORAGE_KEYS.TOKEN, "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmit = (data: PhoneForm) => {
    setToken(data.phone);
    router.push(ROUTES_DASHBOARD.BASE);
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Login</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          label="Phone Number"
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register("phone")}
          error={errors.phone?.message}
          className={styles.input}
        />
        <Button
          type="submit"
          variant="primary"
          size="medium"
          disabled={isSubmitting}
          className={styles.button}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
