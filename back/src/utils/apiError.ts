export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static handle(error: any, res: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        details: error.details,
      });
    }

    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
