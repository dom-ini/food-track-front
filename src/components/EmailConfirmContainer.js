import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import EmailConfirm from "./EmailConfirm";

const EmailConfirmContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verifyEmail } = useAuth();
  const { key } = useParams();

  useEffect(() => {
    const sendVerificationKey = async () => {
      try {
        await verifyEmail({ key }).then(() => {
          setIsSuccess(true);
        });
      } catch (err) {
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    sendVerificationKey();
  }, [key, verifyEmail]);

  return <EmailConfirm isLoading={isLoading} isSuccess={isSuccess} />;
};

export default EmailConfirmContainer;
